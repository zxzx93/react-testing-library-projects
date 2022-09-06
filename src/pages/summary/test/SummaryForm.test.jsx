import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SummaryForm from "../SummaryForm";

test("Initial conditions", () => {
  render(<SummaryForm />);

  const checkBox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkBox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  expect(confirmButton).toBeDisabled();
});

test("Checkbox enables button on first click and disables on second click", () => {
  render(<SummaryForm />);

  const checkBox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });

  userEvent.click(checkBox);
  expect(confirmButton).toBeEnabled(); //버튼 활성화

  userEvent.click(checkBox);
  expect(confirmButton).toBeDisabled(); //버튼 비활성화
});

test("popover responds to hover", async () => {
  render(<SummaryForm />);

  //초기에는 팝오버가 hidden
  const nullPopup = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopup).not.toBeInTheDocument();

  //체크박스 라벨에 마우스호버가 되면 팝오버 나타남
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  //다시 마우스호버가 아닐땐 팝오버 사라짐
  userEvent.unhover(termsAndConditions);
  // const nullPopoverAgain =
  //   screen.queryByText(/아이스크림은 주문 되지 않습니다./i);
  // expect(nullPopoverAgain).not.toBeInTheDocument();

  /*
  기존 위에 코드처럼 썻다가 test not wraaped in act(...) 오류가 남.
  원인은 ? 
  팝업 동작이 비동기로 처리되는데 테스트 코드는 비동기가 아니라서 
  렌더링/업데이트 되고 있는중에 테스트가 먼저 종료가 되어서 일어난 문제.
  해결방법 ? 
  비동기적으로 처리하고 있는 컴포넌트를 테스트가 끝난 후에 컴포넌트가 업데이트 되도록 만든 동작을 찾아내서 테스트 내에서 waitForElementToBeRemoved()로 처리함.
  */
  //MEMO 비동기 메서드 waitForElementToBeRemoved() : 요소가 존재하다가 비동기적으로 사라짐
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
