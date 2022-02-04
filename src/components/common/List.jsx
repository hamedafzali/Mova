import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ListCard from "./ListCard";
import { useSelector } from "react-redux";
import { getTags } from "../../services/product";
import { Button } from "@mui/material";
export default function TitlebarBelowImageList({
  data,
  addToCard,
  removeFromCard,
  cart,
}) {
  React.useEffect(() => {
    handleGetTags();
  }, []);

  const [tags, setTags] = React.useState([]);
  const [tag, setTag] = React.useState("all");
  let setting = useSelector((state) => state.settingReducer);
  const handleGetTags = async () => {
    const { data } = await getTags();

    setTags([
      {
        displayName: "ALL",
        tag: "all",
      },
      ...data,
    ]);
  };
  return (
    <React.Fragment>
      {tags &&
        tags.map((i) => (
          <Button
            variant={tag === i.tag ? "contained" : "outlined"}
            sx={{ margin: 1 }}
            onClick={() => setTag(i.tag)}
            key={i.tag}
          >
            {i.displayName}
          </Button>
        ))}
      <ImageList cols={setting.col}>
        {data
          .filter((i) =>
            tag === "all" || i.tags.filter((j) => j === tag).length ? i : null
          )
          .map((item) => (
            <ListCard
              item={item}
              addToCard={addToCard}
              removeFromCard={removeFromCard}
              cart={cart}
              key={item.itemId}
            />
          ))}
      </ImageList>
    </React.Fragment>
  );
}
