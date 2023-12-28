function ResourceCard({ title, description, link, img }) {
  return (
    <div className="max-w-md mx-auto bg-[#E8B019] rounded-xs overflow-hidden md:max-w-2xl  transition-transform hover:scale-105">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <img
              className="h-48 w-full object-fill md:w-48 "
              src={img}
              alt="Resource"
            />
          </a>
        </div>
        <div className="p-4 md:p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {title}
          </div>
          <p className="block mt-1 text-lg leading-tight font-medium text-black">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResourceCard;
