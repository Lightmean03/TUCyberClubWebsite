import React from 'react';

export default function NewHome() {
  return (
    <>
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center" style={{ minHeight: "75vh" }}>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12 pb-24">
                  <h1 className="text-white font-semibold text-5xl">
                    Towson Cyber Defense Club
                  </h1>
                  <p className="mt-4 text-lg text-gray-300">
                    We are a group of passionate students dedicated to exploring and advancing cybersecurity. Join us in our mission to learn, collaborate, and compete in the exciting field of cyber defense. Meetings every Thursday at 5:00 pm in Smith Hall room 356.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

<section className="relative bottom-40">
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap">
      
      <div className="lg:pt-12 pt-6 w-full md:w-6/12 px-4 text-center">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">    
          <div className="px-4 py-5 flex-auto">
            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
            </div>
            <h6 className="text-xl font-semibold text-black">Explore Cybersecurity</h6>
            <p className="mt-2 mb-4  text-black">
              Delve into the world of cybersecurity with us. Discover award-winning insights and gain hands-on experience in our engaging sessions.
            </p>
          </div>
        </div>
      </div>

   
      <div className="lg:pt-12 pt-6 w-full md:w-6/12 px-4 text-center">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
          <div className="px-4 py-5 flex-auto">
            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
              <i className="fas fa-award"></i>
            </div>
            <h6 className="text-xl font-semibold text-black">Explore Cybersecurity</h6>
            <p className="mt-2 mb-4  text-black">
              Delve into the world of cybersecurity with us. Discover award-winning insights and gain hands-on experience in our engaging sessions.
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
</main>
    
    </>
  );
}
