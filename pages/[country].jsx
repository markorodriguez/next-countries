import Layout from "../Components/Layout";
import Link from "next/link";

const selectedCountry = ({ data, arrayBorderNames }) => {
    return (
        <>
            {data.status == "404" ? (
                <Layout title={"Error | Countries API"}>
                    <div className="my-14">
                        <img
                            className="mx-auto"
                            src="https://http.cat/510"
                            alt="code_cat"
                        />
                    </div>
                </Layout>
            ) : (
                <Layout title={data[0].name.common + " | Countries API"}>
                    <Link href="/">
                        <button className="px-4 py-1 my-14 bg-dark_blue rounded-sm text-custom_white">
                            {" "}
                            ← Back{" "}
                        </button>
                    </Link>

                    <div className="grid gap-12 grid-cols-1 md:grid-cols-2 grid-rows-1">
                        <div>
                            <img className="h-full" src={data[0].flags.svg} alt="" />
                        </div>
                        <div className="py-8 text-custom_white">
                            <h1 className="text-3xl font-semibold">{data[0].name.common}</h1>
                            <div className="flex gap-4 my-8 flex-col md:flex-row w-full">
                                <div className="md:w-3/6 w-full">
                                    <h3 className="my-2">
                                        {" "}
                                        <span className="font-semibold">
                                            {" "}
                                            Official name :{" "}
                                        </span>{" "}
                                        {data[0].name.official}{" "}
                                    </h3>
                                    <h3 className="my-2">
                                        {" "}
                                        <span className="font-semibold"> Population : </span>{" "}
                                        {data[0].population.toLocaleString("en-US")}{" "}
                                    </h3>
                                    <h3 className="my-2">
                                        {" "}
                                        <span className="font-semibold"> Region : </span>{" "}
                                        {data[0].region ? data[0].region : "---"}{" "}
                                    </h3>
                                    <h3 className="my-2">
                                        {" "}
                                        <span className="font-semibold"> Subregion : </span>{" "}
                                        {data[0].subregion ? data[0].subregion : " --- "}{" "}
                                    </h3>
                                    <h3 className="my-2">
                                        {" "}
                                        <span className="font-semibold"> Capital : </span>{" "}
                                        {data[0].capital ? data[0].capital : " --- "}{" "}
                                    </h3>
                                </div>
                                <div className="md:w-3/6 w-full">
                                    <h3 className="my-2">
                                        {" "}
                                        <span className="font-semibold">
                                            {" "}
                                            Top level domain :{" "}
                                        </span>{" "}
                                        {data[0].tld ? data[0].tld[0] : " not provided "}{" "}
                                    </h3>
                                    <h3 className="my-2">
                                        {" "}
                                        <span className="font-semibold"> Currencies : </span>{" "}
                                        {data[0].currencies
                                            ? data[0].currencies[Object.keys(data[0].currencies)[0]]
                                                .name
                                            : "--- "}{" "}
                                    </h3>
                                    <h3 className="my-2">
                                        {" "}
                                        <span className="font-semibold"> Languages : </span>{" "}
                                        {data[0].languages
                                            ? Object.values(data[0].languages).toString()
                                            : " --- "}{" "}
                                    </h3>
                                </div>
                            </div>

                            <h3 className="my-2">
                                {" "}
                                <span className="font-semibold"> Border countries : </span>{" "}
                                {data[0].borders
                                    ? arrayBorderNames.map((el, index) => (
                                        <Link key={index} href={`/${el}`}>
                                            <a>
                                                {" "}
                                                <button className="mx-4 my-4 py-1 px-4 bg-dark_blue shadow-md ">
                                                    {" "}
                                                    {el}{" "}
                                                </button>{" "}
                                            </a>
                                        </Link>
                                    ))
                                    : null}{" "}
                            </h3>
                        </div>
                    </div>
                </Layout>
            )}
        </>
    );
};

export default selectedCountry;

export async function getStaticPaths() {
    try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        const paths = data.map((el) => ({
            params: { country: `${el.name.common}` },
        }));

        return {
            paths,
            fallback: false,
        };
    } catch (err) {
        console.log(err);
    }
}

export async function getStaticProps({ params }) {
    try {
        const res = await fetch(
            "https://restcountries.com/v3.1/name/" +
            `${params.country}` +
            "?fullText=true"
        );
        const data = await res.json();

        const resGlobal = await fetch("https://restcountries.com/v3.1/all");
        const dataGlobal = await resGlobal.json();

        const arrayBorderNames = [];

        if (data.status != "404") {
            const result = dataGlobal.find(
                (element) => element.cca3 == data[0].cca3
            );

            if (result.borders != null) {
                result.borders.map((el) => {
                    const borderCountry = dataGlobal.find(
                        (country) => country.cca3 == el
                    );
                    arrayBorderNames.push(borderCountry.name.common);
                });
            }
        }

        return {
            props: {
                data,
                arrayBorderNames,
            },
        };
    } catch (err) {
        console.log(err);
    }
}
