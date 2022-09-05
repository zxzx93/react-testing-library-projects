import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* summary , entry page는 provider가 필요함. */}
        <OrderEntry />
      </OrderDetailsProvider>

      {/* 주문 확인 페이지는 provider가 필요 없음. */}
    </Container>
  );
}

export default App;
