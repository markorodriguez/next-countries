import Link from "next/link";

const Country = ({ name, continent, population, flag, region, capital }) => {
  return (
    <div id={name.toLowerCase()}  className={continent +" flex country rounded-lg border-0 lg:mx-0 mx-auto overflow-hidden bg-dark_blue text-white w-full h-auto flex-col"}>
      <img className="w-full h-36" src={flag}></img>
      <div className="my-2 w-5/6 mx-auto">
        <h2 className="my-2 font-semibold">
          <Link href={`/${name}`}>{name}</Link>
        </h2>
        <div className="my-1">
          <h3>
            <span className="text-sm font-semibold">Population:</span>{" "}
            {population.toLocaleString("en-US")}{" "}
          </h3>
          <h3>
            <span className="text-sm font-semibold">Region:</span> {region}{" "}
          </h3>
          <h3>
            <span className="text-sm font-semibold">Capital:</span>{" "}
            {capital ? capital : "-----"}{" "}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Country;
