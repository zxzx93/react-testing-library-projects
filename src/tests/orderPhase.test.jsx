import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("order phases for happy path", async () => {
  //render app
  render(<App />);
  //스쿱과 토핑 추가
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");

  //MEMO 여기서 초콜렛 인풋은 await 필요가 없음. 왜냐하면 이미 앞전 바닐라를 서버에서 가져왔기 때문에 초콜렛은 가져올 필요 없음.
  const chocolateInput = screen.getByRole("spinbutton", { name: "Chocolate" });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "3");

  const MMscheckbox = await screen.findByRole("checkbox", { name: "M&Ms" });
  userEvent.click(MMscheckbox);

  //주문 요약 버튼을 찾아 클릭
  const orderSummaryButton = screen.getByRole("button", {
    name: /order sundae/i,
  });
  userEvent.click(orderSummaryButton);

  //주문에 따른 요약 정보 확인
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", {
    name: "Scoops: $8.00",
  });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingsHeading).toBeInTheDocument();

  const optionItems = screen.getAllByRole("listitem");
  const optionItemsText = optionItems.map((item) => item.textContent);
  expect(optionItemsText).toEqual(["1 Vanilla", "3 Chocolate", "M&Ms"]);

  //이용 약관에 동의하고 버튼을 클릭하여 주문 확인
  const tcCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  userEvent.click(tcCheckbox);

  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  userEvent.click(confirmOrderButton);

  //확인 페이지에서 주문 번호 확인
  const thankYouHeader = await screen.findByRole("heading", {
    name: /Thank You!/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  //확인 페이지에서 "새 주문" 버튼 클릭
  const newORderButton = screen.getByRole("button", {
    name: /Create new order/i,
  });
  userEvent.click(newORderButton);

  //다시 주문 페이지로 돌아가면 스쿱과 토핑 subtotal이 reset 되었는지 확인
  const scoopsTotal = await screen.findByText("Scoops total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = screen.getByText("Toppings total: $0.00");
  expect(toppingsTotal).toBeInTheDocument();

  //바닐라 버튼과 체리 체크박스가 테스트를 종료하기전 스쿱,토핑 관련 axios 호출이 전부 반환 되었는지 확인 위해 대기해야함
  await screen.findByRole("spinbutton", { name: "Vanilla" });
  await screen.findByRole("checkbox", { name: "Cherries" });
});
