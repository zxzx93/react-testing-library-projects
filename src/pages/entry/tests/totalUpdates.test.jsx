import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";

test("스쿱 수량을 바뀌면 스쿱 가격 토탈이 바뀜.", async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

  //초기 토탈 가격이 0원
  const scoopsSubtotal = screen.getByText("Scoops total:", {
    exact: false,
  });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  //바닐라 스쿱을  input을 1로 업데이트 시키고 토탈 확인
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  //초콜릿 스쿱을 input을 2로 업데이트한 후 다시 토탈 확인
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});
