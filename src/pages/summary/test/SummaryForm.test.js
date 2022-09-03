import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SummaryForm from "../SummaryForm";

test("초기에는 이용약관 체크박스가 체크가 안되어 있는지 확인, 주문하기 버튼이 비활성화 되어있어야 함", () => {
  render(<SummaryForm />);

  const checkBox = screen.getByRole("checkbox", { name: /이용약관/i });
  expect(checkBox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", { name: /주문하기/i });
  expect(confirmButton).toBeDisabled();
});

test("이용약관에 동의 체크하면 주문하기 버튼 활성화되고, 한번 더 체크박스 누르면 버튼 비활성화됨", () => {
  render(<SummaryForm />);

  const checkBox = screen.getByRole("checkbox", { name: /이용약관/i });
  const confirmButton = screen.getByRole("button", { name: /주문하기/i });

  userEvent.click(checkBox);
  expect(confirmButton).toBeEnabled(); //버튼 활성화

  userEvent.click(checkBox);
  expect(confirmButton).toBeDisabled(); //버튼 비활성화
});

test("이용약관이 클릭 됐을때 팝오버", async () => {
  render(<SummaryForm />);

  //초기에는 팝오버가 hidden
  const nullPopup = screen.queryByText(/아이스크림은 주문 되지 않습니다./i);
  expect(nullPopup).not.toBeInTheDocument();

  //체크박스 라벨에 마우스호버가 되면 팝오버 나타남
  const termsAndConditions = screen.getByText(/이용약관/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/아이스크림은 주문 되지 않습니다./i);
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
    screen.queryByText(/아이스크림은 주문 되지 않습니다./i)
  );
});
