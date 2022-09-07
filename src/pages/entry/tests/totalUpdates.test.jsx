import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);

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

test("토핑이 체크 됐을때 subtotal 변경되는지 확인", async () => {
  render(<Options optionType="toppings" />);

  //토핑 합계 초기값은 0원
  const toppingsTotal = screen.getByText("Toppings total:", {
    exact: false,
  });
  expect(toppingsTotal).toHaveTextContent("0.00");

  //체리를 추가하고 subtotal 확인
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.50");

  //hot fudge 추가 및 subtotal 확인
  const hotFudgeCheckbox = screen.getByRole("checkbox", { name: "Hot fudge" });
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("3.00");

  //hot fudge를 체크 해제하고 subtotal 확인
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("스쿱이 먼저 추가되면 합계가 올바르게 변경되는지 확인", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /Grand total: \$/i,
    });

    //합계가 0에서 시작하는지 확인
    expect(grandTotal).toHaveTextContent("0.00");

    //바닐라 스쿱 2번 체크한 후 합계 확인
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    //체리를 추가하고 총계를 확인
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("토핑이 먼저 추가되면 합계가 올바르게 변경되는지 확인", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /Grand Total: \$/i,
    });

    //체리를 추가하고 총계를 확인
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");

    //바닐라 스쿱을 2로 업데이트하고 총계를 확인
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("항목 제거시 총합계가 제대로 업데이트 되는지 확인", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /Grand Total: \$/i,
    });

    // 체리를 추가
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesCheckbox); //합계 : 1.50

    // 바닐라 스쿱을 2로 업데이트 총합계는 5.50이어야 합니다.
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2"); //합계 : 5.50

    // 바닐라 1스쿱을 제거하고 합계를 확인
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1"); //합계 : 3.50

    //총계 확인
    expect(grandTotal).toHaveTextContent("3.50");

    //체리를 제거하고 합계를 확인
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
