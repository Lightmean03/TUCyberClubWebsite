import Spaceman from "../Images/SpaceMan.png";

export default function NewHome() {
  return (
    <div className="w-full border-b">
      <div className="flex mx-6 px-6 pt-12 md:mx-26 md:px-16 xl:px-24 xl:mx-44 items-center justify-between">
        <h1 className="w-56 md:w-auto text-xl md:text-2xl lg:text-4xl xl:text-5xl ">
          Towson Cyber Defense Club
        </h1>
        <img src={Spaceman} alt="Welcome" className="w-16 h-16 md:w-72 md:h-64" />
      </div>
    </div>
  );
}
