import Button from "../../../common/Button";

const Location = () => {
    return (
        // <div className="bg-[#429A2D] h-12 w-full flex items-center justify-evenly md:hidden">
        //     <p className="text-2xl text-white font-medium">Location</p>
        // </div>
        <Button
            text={"Location"}
            color={"#FFFFFF"}
            fontSize="text-2xl"
            size={"large"}
            className={"w-full h-20"}
            customClasses={"mt-6 mx-auto"}
            textColor={"text-black"}

        />
    );
};

export default Location;
