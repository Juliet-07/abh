import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function DashSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="w-full max-w-[400px] my-[20px]">
      <Slider {...settings}>
        {["", "","", ""].map((data, index) => {
          return (
            <div>
              <div className=" min-h-[350px] w-full bg-[url(/BrusselsSprouts.webp)]
              bg-no-repeat bg-center bg-contain
               bg-white border-[1px] border-[gainsboro] rounded-[10px]">
                {/* <h3>1</h3> */}
              </div>
              <div className="mt-4 flex flex-col w-full ">
              <div className="mt-4 flex flex-row w-full justify-between ">
                <b>Brusseis Sprout</b>
                <div className="flex flex-row gap-2">
                <img src="/svgs/svgexport-48.svg" alt="" width={15} height={15} />
                <img src="/svgs/svgexport-48.svg" alt="" width={15} height={15} />
                <img src="/svgs/svgexport-48.svg" alt="" width={15} height={15} />
                <img src="/svgs/svgexport-48.svg" alt="" width={15} height={15} />
                <img src="/svgs/svgexport-48.svg" alt="" width={15} height={15} />

                </div>
                </div>
                <p className="text-[grey] line-1 overflow-ellipsis">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                <b className="text-[grey]">$350</b>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default DashSlider;
