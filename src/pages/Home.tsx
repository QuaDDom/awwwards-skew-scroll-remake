import photos from '../data';
import GridItem from '../components/GridItem';
import '../styles/home.scss';
import LocomotiveScroll from 'locomotive-scroll';
import imagesLoaded from 'imagesloaded';
import 'locomotive-scroll/src/locomotive-scroll.scss'
import { MutableRefObject, useEffect, useRef } from 'react';

const clamp = (value:number, min:number, max:number)=> value <= min ? min : value >= max ? max : value;

const preload = (sel: any) => {
    return new Promise((resolve) => {
      imagesLoaded(
        document.querySelectorAll(sel),
        { background: true },
        resolve
      );
    });
  };

export default function Home() {
    const ref = useRef(null);

    const scroll = useRef({
        cache: 0,
        current: 0,
    })

    const leftColumnRef  = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;;
    const middleColumnRef  = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;;
    const rightColumnRef  = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;;
    
    useEffect(()=>{
        const scrollEl = new LocomotiveScroll({
            el: ref.current,
            smooth: true,
            smartphone: {
                smooth: true
            },
            getDirection: true,
            getSpeed: true
        });

        scrollEl.on('scroll', (mouse: any)=>{
            scroll.current.current = mouse.scroll.y;
            const distance = scroll.current.current - scroll.current.cache;
            scroll.current.cache = scroll.current.current;

            leftColumnRef.current.style.transform = `skewY(${clamp(distance, -10, 10)}deg)`;
            middleColumnRef.current.style.transform = `skewY(${clamp(-distance, -10, 10)}deg)`;
            rightColumnRef.current.style.transform = `skewY(${clamp(distance, -10, 10)}deg)`;

        });

        Promise.all([preload(".grid-item-media")]).then(() => {
            scrollEl.update();
        });

    },[])   


    const leftChunk = [...photos].splice(0, 5);
    const middleChunk = [...photos].splice(5, 5);
    const rightChunk = [...photos].splice(10, 5);

    console.log(rightChunk)
    return (
        <div className="main-container" ref={ref} data-scroll-container>
            <div className="grid-wrap">
                <div className="left-column" ref={leftColumnRef}>
                    {
                        leftChunk.map(({url, description}, i)=>(
                            <GridItem 
                            url={url}
                            description={description}
                            key={url}
                            />
                        ))
                    }
                </div>
                <div className="middle-column"
                data-scroll
                data-scroll-speed = "-20"
                >

                    <div
                     ref={middleColumnRef}>
                    {
                        middleChunk.map(({url, description}, i)=>(
                            <GridItem
                            url={url}
                            description={description}
                            key={url}
                            />
                        ))
                    }
                    </div>
                </div>
                <div className="right-column" ref={rightColumnRef}>
                    {
                        rightChunk.map(({url, description}, i)=>(
                            <GridItem 
                            url={url}
                            description={description}
                            key={url}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
