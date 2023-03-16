import Spline from "@splinetool/react-spline";

const Piece = (type) => {
  if (!type.type) return;

  return (
    <div className="piece">
      {type.type === "cross" ? (
        <Spline scene="https://prod.spline.design/ITazynfmF8tkh-CM/scene.splinecode" />
      ) : (
        <Spline scene="https://prod.spline.design/QpNJyJZQeHCP8tX0/scene.splinecode" />
      )}
    </div>
  );
};

export default Piece;
