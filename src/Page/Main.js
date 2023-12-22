import Card from "../Components/Card/Card";
import SliderCarousel from "../Components/SliderCarousel/SliderCarousel";

export default function Main() {
  return (
    <div>
      <div className="App"></div>
      <div className="container text-center">
        <div className="top-wrapper">
          <SliderCarousel />
        </div>
        <div className="containerCard">
          <Card />
        </div>
        <div />
      </div>
    </div>
  );
}
