import { useEffect, useState, type ReactNode } from 'react'
import { rgbeLoader } from './CanvasGPU'
import { useFrame, useThree } from '@react-three/fiber'
import { Color, DirectionalLight, EquirectangularReflectionMapping, Object3D, UnsignedByteType } from 'three'
import { PostProcessing } from 'three/webgpu'
import {
  pass,
  mrt,
  output,
  normalView,
  diffuseColor,
  velocity,
  add,
  vec3,
  vec4,
  directionToColor,
  colorToDirection,
  sample,
} from 'three/tsl'
import { ssgi } from 'three/addons/tsl/display/SSGINode.js'
import { traa } from 'three/addons/tsl/display/TRAANode.js'

export function EnvLoader({
  url,
  background = false,
  env = true,
}: {
  url: string
  background?: boolean
  env?: boolean
}) {
  const [sun, setSun] = useState<ReactNode>(null)
  const scene = useThree((r) => r.scene)
  const camera = useThree((r) => r.camera)
  const renderer = useThree((r) => r.gl)

  const [fnc, setFnc] = useState(() => {
    return () => {}
  })
  //
  useEffect(() => {
    rgbeLoader.loadAsync(url).then((data) => {
      data.mapping = EquirectangularReflectionMapping
      scene.background = data

      // scene.backgroundBlurriness = 0.5
      if (background) {
      }
      if (env) {
        scene.environment = data
      }
      console.log(data)
    })

    scene.environmentIntensity = 0.5

    const object: any = new Object3D()

    const dirL = new DirectionalLight(0xffffff, 1)
    dirL.position.set(20, 10, 0)

    object.sunLight = dirL
    object.sunLight.castShadow = true

    object.add(object.sunLight)
    object.add(object.sunLight.target)

    object.sunLight.castShadow = true
    object.sunLight.shadow.camera.near = 0
    object.sunLight.shadow.camera.far = 150 * 2

    object.sunLight.shadow.camera.left = -5.123 * 4
    object.sunLight.shadow.camera.right = 5.123 * 4
    object.sunLight.shadow.camera.bottom = -5.123 * 4
    object.sunLight.shadow.camera.top = 5.123 * 4

    object.sunLight.shadow.mapSize.width = 1024
    object.sunLight.shadow.mapSize.height = 1024
    object.sunLight.shadow.radius = 1
    object.sunLight.shadow.bias = -0.00035

    object.sunLight.shadow.intensity = 1.0
    object.sunLight.intensity = 2.0

    setSun(
      <group name='light-player-target'>
        <primitive object={object}></primitive>
      </group>,
    )

    const postProcessing = new PostProcessing(renderer as any)

    const scenePass = pass(scene, camera)
    scenePass.setMRT(
      mrt({
        output: output,
        diffuseColor: diffuseColor,
        normal: directionToColor(normalView),
        velocity: velocity,
      }),
    )

    const scenePassColor = scenePass.getTextureNode('output')
    const scenePassDiffuse = scenePass.getTextureNode('diffuseColor')
    const scenePassDepth = scenePass.getTextureNode('depth')
    // .toInspector('Depth', () => {
    //   return scenePass.getLinearDepthNode()
    // })

    const scenePassNormal = scenePass.getTextureNode('normal') //.toInspector('Normal')
    const scenePassVelocity = scenePass.getTextureNode('velocity') //.toInspector('Velocity')

    // bandwidth optimization

    const diffuseTexture = scenePass.getTexture('diffuseColor')
    diffuseTexture.type = UnsignedByteType

    const normalTexture = scenePass.getTexture('normal')
    normalTexture.type = UnsignedByteType

    const sceneNormal = sample((uv) => {
      return colorToDirection(scenePassNormal.sample(uv))
    })

    // gi
    const giPass = ssgi(scenePassColor, scenePassDepth, sceneNormal, camera as any)
    giPass.sliceCount.value = 2
    giPass.stepCount.value = 8

    // composite

    const gi = giPass.rgb //.toInspector('SSGI')
    const ao = giPass.a //.toInspector('AO')

    const compositePass = vec4(add(scenePassColor.rgb.mul(ao), scenePassDiffuse.rgb.mul(gi)), scenePassColor.a)
    compositePass.name = 'Composite'

    // traa

    const traaPass = traa(compositePass, scenePassDepth, scenePassVelocity, camera)
    postProcessing.outputNode = traaPass

    setFnc(() => {
      return () => {
        postProcessing.render()
      }
    })
    //

    return () => {
      dirL.removeFromParent()
    }
  }, [url, scene, env, background])

  //
  useFrame(() => {
    fnc()
  }, 10)

  return <>{sun}</>
}
