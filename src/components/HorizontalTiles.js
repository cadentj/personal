import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Image, ScrollControls, Scroll, useScroll, Text } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import { Minimap } from './Minimap'
import { state, damp } from './util'
import { Vector3 } from "three";
import Source_Code_Pro from "../fonts/Source_Code_Pro/SourceCodePro-VariableFont_wght.ttf"


const dummy = new Vector3()
let xDim;

function Item({ index, position, scale, c = new THREE.Color(), ...props }) {
    const ref = useRef()
    const scroll = useScroll()
    const { clicked, urls } = useSnapshot(state)
    const [hovered, hover] = useState(false)

    window.HTMLElement.prototype.scrollIntoView = function() {};
    const click = () => {
        state.clicked = index === clicked ? null : index

    }
    const over = () => hover(true)
    const out = () => hover(false)

    function unclick() {
        state.clicked = null
    }

    const [centered, center] = useState(false)
    
    useFrame((state, delta) => {
        const change = ref.current.position.x

        const y = scroll.curve(index / urls.length - 1.5 / urls.length, 4 / urls.length)
        ref.current.material.scale[1] = ref.current.scale.y = damp(ref.current.scale.y, (clicked === index) ? 3.5 : 2 + y, 4, delta)
        ref.current.material.scale[0] = ref.current.scale.x = damp(ref.current.scale.x, (clicked === index) ? 4.7 : scale[0], 6, delta)
        
        
        if (clicked !== null && index < clicked) {
            ref.current.position.x = damp(ref.current.position.x, position[0] - 2, 6, delta)
        }

        if (clicked !== null && index > clicked) ref.current.position.x = damp(ref.current.position.x, position[0] + 2, 6, delta)
        if (clicked === null || clicked === index) ref.current.position.x = damp(ref.current.position.x, position[0], 6, delta)
        ref.current.material.grayscale = damp(ref.current.material.grayscale, hovered || clicked === index ? 0 : Math.max(0, 1 - y), 6, delta)
        ref.current.material.color.lerp(c.set(hovered || clicked === index ? 'white' : '#aaa'), hovered ? 0.3 : 0.1)

        if (scroll.delta > 0.001) unclick()
        if (clicked === index) {
            const difference  = ((position[0]/xDim) - scroll.offset) * xDim
            console.log(difference)
            state.camera.position.lerp(dummy.set(difference,0,5), 0.05)
            center(!centered)
        } else if (clicked === null) {
            state.camera.position.lerp(dummy.set(0,0,5), 0.005)
            center(!centered)
        }
    })
    return <Image ref={ref} {...props} position={position} scale={scale} height={2} onClick={click} onPointerOver={over} onPointerOut={out} />
}

function Items({ w = 0.7, gap = 0.15 }) {
    const { urls } = useSnapshot(state)
    const { width } = useThree((state) => state.viewport)
    const xW = w + gap
    xDim = xW * (urls.length-1)
    console.log(xDim)
    return (
        <ScrollControls horizontal damping={10} pages={(width - xW + urls.length * xW) / width}>
            <Minimap />
            <Scroll>
                {urls.map((url, i) => <Item key={i} index={i} position={[xW * i, 0, 0]} scale={[w, 4, 1]} url={url} />) /* prettier-ignore */}
            </Scroll>
        </ScrollControls>
    )
}

export default function HorizontalTiles() {
    return <Canvas gl={{ antialias: false }} dpr={[1, 1.5]} onPointerMissed={() => (state.clicked = null)}>
        <Text
            scale={[10, 10, 10]}
            color="white" // default
            anchorX="center" // default
            anchorY="middle" // default
            font={Source_Code_Pro}
        >
            Caden Juang
        </Text>
        <Items />
    </Canvas>
}
