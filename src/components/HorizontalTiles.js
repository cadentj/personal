import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Image, ScrollControls, Scroll, useScroll, Text } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import { Minimap } from './Minimap'
import { state, damp } from './util'
import { Vector3 } from "three";
import Montserrat from "../fonts/Montserrat/static/Montserrat-Bold.ttf"
import Courier_Prime from "../fonts/Courier_Prime/CourierPrime-Regular.ttf"


const dummy = new Vector3()
let xDim;
const titles = ["MAV APP", "HOUSING MODEL", "EMAIL BOT", "THUNDER DASH", "CODE CLUB", "AI CLUB"]

function Item({ index, position, scale, c = new THREE.Color(), ...props }) {
    const ref = useRef()
    const scroll = useScroll()
    const { clicked, urls } = useSnapshot(state)
    const [hovered, hover] = useState(false)

    window.HTMLElement.prototype.scrollIntoView = function () { };
    const click = () => {
        state.clicked = index === clicked ? null : index
        props.setTitles(titles[index])
    }
    const over = () => hover(true)
    const out = () => hover(false)

    function unclick() {
        state.clicked = null
    }

    const [centered, center] = useState(false)

    useFrame((state, delta) => {
    
        const difference = scroll.offset * xDim
        const newIndex = (clicked === null) ? 0 : index - clicked;
        const y = scroll.curve(index / urls.length - 1.5 / urls.length, 4 / urls.length)
        ref.current.material.scale[1] = ref.current.scale.y = damp(ref.current.scale.y, (clicked === index) ? 3.5 : 2 + y, 4, delta)
        ref.current.material.scale[0] = ref.current.scale.x = damp(ref.current.scale.x, (clicked === index) ? 4.7 : scale[0], 6, delta)

        if (clicked !== null && index < clicked) ref.current.position.x = damp(ref.current.position.x, difference + (newIndex * 0.85) - 2, 6, delta)
        if (clicked !== null && index > clicked) ref.current.position.x = damp(ref.current.position.x, difference + (newIndex * 0.85) + 2, 6, delta)
        if (clicked === null) ref.current.position.x = damp(ref.current.position.x, position[0], 6, delta)

        if (clicked === index) ref.current.position.x = damp(ref.current.position.x, difference, 6, delta)
        if (scroll.delta > 0.001) unclick()
        if (clicked === null) props.setTitles("")

        ref.current.material.grayscale = damp(ref.current.material.grayscale, hovered || clicked === index ? 0 : Math.max(0, 1 - y), 6, delta)
        ref.current.material.color.lerp(c.set(hovered || clicked === index ? 'white' : '#aaa'), hovered ? 0.3 : 0.1)
    })
    return <Image ref={ref} {...props} position={position} scale={scale} height={2} onClick={click} onPointerOver={over} onPointerOut={out} />
}

function Items({ w = 0.7, gap = 0.15, setTitles}) {
    const { urls } = useSnapshot(state)
    const { width } = useThree((state) => state.viewport)
    const xW = w + gap
    xDim = xW * (urls.length - 1)
    console.log(xDim)
    return (
        <ScrollControls horizontal damping={10} pages={(width - xW + urls.length * xW) / width}>
            <Minimap />
            <Scroll>
                {urls.map((url, i) => <Item key={i} index={i} position={[xW * i, 0, 0]} scale={[w, 4, 1]} url={url} setTitles={setTitles}/>) /* prettier-ignore */}
            </Scroll>
        </ScrollControls>
    )
}

function Screen() {
    const [titleTop, setTop] = useState("");
    const [titleBottom, setBottom] = useState("");

    function setTitles(title) {
        const split = title.split(' ')
        setTop(split[0])
        setBottom(split[1])
    }

    return (
       
        <>
            <Text
                scale={[10, 10, 10]}
                position={[0,1.5,0]}
                color="white" // default
                font={Montserrat}
                letterSpacing={0.3}
            > 
                {titleTop}
            </Text>
            <Text
                scale={[10, 10, 10]}
                position={[0,-1.5,0]}
                color="white" // default
                font={Montserrat}
                letterSpacing={0.3}
            > 
                {titleBottom}
            </Text>
            <Text
                scale={[2, 2, 2]}
                position={[0,-3,0]}
                color="white" // default
                font={Courier_Prime}
                letterSpacing={0.1}
            >
                there are three things
            </Text>
            <Items setTitles={setTitles}/>
        </>
    )
}

export default function HorizontalTiles() {
    return <Canvas gl={{ antialias: false }} dpr={[1, 1.5]} onPointerMissed={() => (state.clicked = null)}>
        <Screen/>
    </Canvas>
}
