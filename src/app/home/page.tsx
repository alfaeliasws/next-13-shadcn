"use client"
import { category, navbar } from '@/utils/mockData'
import React, { useEffect, useState } from 'react'
import Image from "next/image"
import SearchBar from '@/components/searchbar/search-bar'
import { Raleway, Jost } from 'next/font/google'

const raleway = Raleway({subsets: ['latin']})
const jost = Jost({subsets: ['latin']})

function Home() {

  const [hovers, setHovers] = useState(2149)
  const [subCat, setSubCat] = useState<any>([])

  return (
    <div>
        <header className="flex flex-col h-screen transition-all">
          <nav className='flex flex-wrap w-[100%] justify-between'>
              <div className='bg-black w-2/12 grid place-content-center py-3'>
                <Image 
                   src="/favicon.png"
                   width={40}
                   height={40}
                   alt="Logo"
                   />
              </div>
              <div className='text-white w-8/12 flex justify-center py-3 bg-black'>
                <SearchBar />
              </div>
              <div className='bg-black w-2/12 flex flex-wrap justify-evenly py-3'>
                {navbar.map((item: any) => 
                  <button className='px-3 bg-black hover:bg-gray-900 transition-all'>
                    <Image 
                      src={item.icon}
                      width={25}
                      height={25}
                      alt="Logo"
                    />
                  </button>
                  )}
              </div>
          </nav>
          <nav className={`flex flex-wrap w-[100%] justify-between text-white ${jost.className}`}>
              <div className={`bg-slate-900 w-2/12 grid place-content-center text-sm tracking-wider`}>Sort By Category</div>
              <div className='bg-slate-900 w-8/12 flex justify-center'>
                <nav className="w-full flex flex-wrap justify-center">
                  {
                    category.map((item: any) => 
                      <button className={`tracking-wider px-3 w-[${100/category.length}%] text-xs py-3 hover:bg-slate-500 transition-all`}>{item.title}</button>
                    )
                  }
                </nav>
              </div>
              <div className='tracking-wider w-2/12 grid place-content-center py-2 bg-slate-900 text-xs hover:opacity-60 transition-all cursor-pointer'>Recently Viewed</div>

          </nav>
          <div id="HERO" className='flex flex-wrap h-[40%] justify-around py-5 px-5 bg-gray-50'>
            <article className='w-[60%] h-full bg-[url(/Banner1.png)] bg-no-repeat bg-cover rounded-xl shadow-lg flex flex-wrap content-center pl-3'>
              <p className={`w-full text-transparent bg-gradient-to-r bg-clip-text from-black to-gray-200 mb-4 ${jost.className} tracking-widest text-5xl hover:animate-pulse cursor-default`}>CREATE YOUR SETUP</p>
              <p className={`w-full text-transparent bg-gradient-to-r bg-clip-text from-black to-gray-200 ${jost.className} tracking-widest text-5xl hover:animate-pulse cursor-default`}>CREATE YOUR LIFE</p>
            </article>
            <div className='w-[30%] h-full bg-[url(/Ads1.png)] bg-cover rounded-xl shadow-lg'>
              <div id="backdrop-blur-flex-container" className='flex flex-wrap content-center justify-end w-full h-full hover:backdrop-blur-md rounded-xl transition-all cursor-pointer'>
                <p className={`w-8/12 text-transparent bg-gradient-to-r from-transparent via-gray-900/90 to-slate-900 hover:bg-black tracking-wider text-5xl ${jost.className} font-bold bg-clip-text pr-5 text-right cursor-pointer transition-all cursor`}>Sale 50%</p>
                <p className={`w-full text-transparent bg-gradient-to-r from-transparent via-gray-900/90 to-slate-900  tracking-wider text-2xl ${jost.className} font-bold bg-clip-text pr-5 text-right hover:bg-black cursor-pointer transition-all`}>Only on March 2024</p>
              </div>
            </div>
          </div>
          <section id="CATEGORY" className="flex flex-wrap flex-grow bg-gray-50 px-6 content-start">
            <h1 className={`font-bold uppercase tracking-wider h-[20%] grid place-content-center pl-10 ${raleway.className}`}>
              Browse By Category
            </h1>
            <section className="w-full flex flex-wrap justify-around bg-gray-50 py-2 tranistion-all">
            {
              category.map((item: any, index: number) => 
                <button className={`px-7 w-[${100/category.length}%] bg-slate-100 py-12 rounded-2xl shadow-lg tracking-wider text-md hover:bg-slate-200 transition-all`} onMouseOver={(e) => {setHovers((prev) =>  {
                  return index
                })}}>{item.title}</button>
              )
            }
            </section>
          </section>
          <section className="w-full flex flex-wrap justify-center bg-gray-50 pt-2 pb-8 tranistion-all px-12">
            {
              hovers < 2149 ? 
                  category.slice(hovers, hovers + 1)[0].subCategory.map((item: any, index: number) =>  
                  {
                      if(index < 8) {
                        return (
                          <button className={`px-5 w-[${100/(category.slice(hovers, hovers + 1)[0].subCategory.length)}%] bg-gray-900 py-3 text-white mx-1 rounded-2xl shadow-lg tracking-wider text-sm hover:bg-gray-600 transition-all`} onMouseOver={(e) => {
                            setSubCat((prev: any) =>  {
                              console.log(item)
                          return item
                          })}}>{item.title}</button>
                        )
                      }

                      return <></>
                  }
                ) : 
              <></>
            }
          </section>
        </header>
        <main>
            <section className='flex flex-wrap'>
              {hovers < 2149 && subCat?.products && JSON.stringify(subCat?.products) != JSON.stringify([]) ?
                subCat.products.map((item: any, index: number) => {
                  return (
                    <div className="flex flex-wrap w-3/12 px-3 min-h-[40vh] content-start mb-3">
                      <div className="w-full h-full rounded-xl bg-blue-100">
                        <section className='w-full h-[60%] bg-red-200 rounded-xl'></section>
                        <div id="wrapper-product-text" className="flex flex-wrap content-start px-3 bg-red-100 flex-grow">
                          <p className={`w-full text-md ${jost.className} flex-grow`}>{item.title}</p>
                          <p className={`w-full text-md ${jost.className} font-bold tracking-wide`}>Rp {item.price}</p>
                        </div>
                      </div>
                    </div>
                  )
                }) :
                <></>
              }
            </section>
            <section>

            </section>
        </main>
        <footer></footer>
    </div>
  )
}

export default Home