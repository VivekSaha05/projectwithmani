"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchForm from "./SearchForm";
import Filters from "./Filters";
import Header from "./Header";
import ProjectCard from "./ProjectCard";

const Feed = () => {
  const searchParams = useSearchParams();

  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const category = searchParams.get("category") || "";
      const query = searchParams.get("query") || "";
      const response = await fetch(
        `/api/project?category=${category}&query=${query}`
      );
      const data = await response.json();
      setProjects(data);
    };

    fetchProjects();
  }, [searchParams]);

  return (
    <>
      <section className="nav-padding w-full">
        <div className="flex-center relative min-h-[274px] w-full flex-col rounded-xl bg-banner bg-cover bg-center text-center">
          <h1 className="sm:heading1 heading2 mb-6 text-center text-white">
            Projects With Mani
          </h1>
        </div>
        <SearchForm />
      </section>
      <Filters />
      {(searchParams.get("query") || searchParams.get("category")) && (
        <section className="flex-center mt-6 w-full flex-col sm:mt-20">
          <Header
            query={searchParams.get("query") || ""}
            category={searchParams.get("category") || ""}
          />
          <div className="mt-12 flex w-full flex-wrap justify-center gap-10 sm:justify-start">
            {projects?.length > 0 ? (
              projects.map((project: any) => (
                <ProjectCard
                  key={project._id}
                  id={project._id}
                  title={project.title}
                  summary={project.summary}
                  content={project.content}
                  category={project.category}
                  imgUrl={project.thumbnail?.url || "/default-image-url.jpg"}
                  youtubeLink={project.youtubelink}
                />
              ))
            ) : (
              <p className="body-regular text-white-400">No projects found</p>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Feed;
