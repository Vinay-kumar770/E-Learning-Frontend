import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/index"; // ✅ Import RootState for TypeScript
import styles from "./search.module.css";

// ✅ Define Course Type
interface Course {
  _id: string;
  title: string;
  name: string;
}

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [isOpen, setOpen] = useState<boolean>(false);
  const searchNode = useRef<HTMLDivElement | null>(null);

  // ✅ Use useSelector to get Courses from Redux store
  const Courses = useSelector((state: RootState) => state.course.Courses);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (
        searchNode.current &&
        !searchNode.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const queryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setOpen(true);
  };

  const filteredSubjects = (courses: Course[], query: string) => {
    if (!query) return Courses;
    return courses.filter(
      (course) =>
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const SearchItems = filteredSubjects(Courses, query);

  return (
    <div>
      <form className="form-inline my-2 my-lg-0">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search Courses"
          aria-label="Search"
          onClick={() => setOpen(true)}
          onChange={queryHandler}
        />
      </form>

      <div className={styles.searchItems} ref={searchNode}>
        {isOpen && (
          <ul>
            {SearchItems.map((item: Course) => (
              <Link
                key={item._id}
                to={`/course/all/${item._id}`}
                style={{ textDecoration: "none" }}
              >
                <li className={styles.name}>
                  {item.title}
                  <span className={styles.author}>- {item.name}</span>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
