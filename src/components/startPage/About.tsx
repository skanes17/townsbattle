import { Link } from "react-router-dom";
import MenuBox from "./MenuBox";

export default function About() {
  return (
    <MenuBox headerText="About" icon="⭐">
      <p className="mt-2 leading-relaxed text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit vel
        suscipit fuga impedit explicabo, consequuntur at corrupti, est, culpa
        nostrum recusandae debitis distinctio odio repellendus voluptatum
        asperiores harum facilis mollitia.
      </p>

      <div className="mt-3 items-center gap-2 sm:flex">
        <Link
          className="mt-2 w-full flex-1 rounded-md bg-green-600 p-2.5 text-center text-white outline-none ring-green-600 ring-offset-2 focus:ring-2"
          to="/"
        >
          Close
        </Link>
      </div>
    </MenuBox>
  );
}
