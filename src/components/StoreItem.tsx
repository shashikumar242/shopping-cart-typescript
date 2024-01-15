import { Card, Button } from "react-bootstrap";
import { formatCurrency } from "../utilities/FormatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

const StoreItem = ({ id, name, price, imgUrl }: StoreItemProps) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);

  return (
    // 100% height

    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2" style={{ width: "100%" }}>
            {name}
          </span>
          <span className="ms-2" text-muted>
            {formatCurrency(price)}
          </span>
        </Card.Title>

        {/* <div className="mt-auto">
          {quantity !== 0 ? (
            <Button className="w-100">+ Add to Cart</Button>
          ) : (
                          <div className="">
                              
              <Button>Hi</Button>
          ]=pogw    GJL' Bye+6/
            </div>
          )}
        </div> */}

        <div className="mt-auto d-flex justify-content-center align-items-center">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
              + Add to Cart
            </Button>
          ) : (
            <div className="d-flex justify-content-center align-items-center flex-column">
              <div
                className="d-flex align-items-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <span className="fs-3">{quantity}</span> in cart
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromCart(id)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
