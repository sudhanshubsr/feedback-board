const ArrowRightAlt = ({ vector, vector1 }) => {
    return (
      <div className="h-[0.81rem] overflow-hidden flex flex-col items-center justify-center relative gap-[0.63rem]">
        <img
          className="w-[1.25rem] h-[1rem] relative z-[0]"
          alt=""
          src={vector}
        />
        <img
          className="w-[66.67%] h-[33.08%] absolute my-0 mx-[!important] top-[33.08%] right-[16.67%] bottom-[33.85%] left-[16.67%] max-w-full overflow-hidden max-h-full z-[1]"
          alt=""
          src={vector1}
        />
      </div>
    );
  };
  
  export default ArrowRightAlt;
  