import { Box } from "@mui/material";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import { deleteTopping } from "../../../../api/cartApi";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ToppingChip({
  toppingDetail,
  cartCode,
  setToppingDetail,
}) {
  const handleDeleteTopping = async (productToppingId) => {
    const result = await deleteTopping(productToppingId, cartCode);
    if (result?.data?.status === 201) {
      setToppingDetail((toppings) =>
        toppings.filter(
          (topping) => topping.productToppingId !== productToppingId
        )
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
        maxWidth: "300px",
      }}
      component="ul"
    >
      {toppingDetail?.map((data) => {
        return (
          <ListItem key={data.productToppingId}>
            <Chip
              label={data.productToppingName}
              onDelete={() => handleDeleteTopping(data.productToppingId)}
              sx={{
                "&:hover": { bgcolor: "rgba(0, 167, 111, 0.5)" },
              }}
            />
          </ListItem>
        );
      })}
    </Box>
  );
}
