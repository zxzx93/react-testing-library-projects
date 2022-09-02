import { render, screen, fireEvent } from "@testing-library/react";
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

  fireEvent.click(checkBox);
  expect(confirmButton).toBeEnabled(); //버튼 활성화

  fireEvent.click(checkBox);
  expect(confirmButton).toBeDisabled(); //버튼 비활성화
});
