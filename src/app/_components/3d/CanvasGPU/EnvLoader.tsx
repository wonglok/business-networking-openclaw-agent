import { useEffect, useState, type ReactNode } from 'react'
import { rgbeLoader } from './CanvasGPU'
import { useThree } from '@react-three/fiber'
import { Color, DirectionalLight, EquirectangularReflectionMapping, Object3D } from 'three'

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
  useEffect(() => {
    rgbeLoader.loadAsync(url).then((data) => {
      data.mapping = EquirectangularReflectionMapping

      // scene.backgroundBlurriness = 0.5
      if (background) {
        scene.background = data
      }
      if (env) {
        scene.environment = data
      }
      console.log(data)
    })

    scene.environmentIntensity = 0.5

    const object: any = new Object3D()

    object.sunLight = new DirectionalLight(0xffffff, 1)
    object.sunLight.castShadow = true

    object.add(object.sunLight)
    object.add(object.sunLight.target)

    object.sunLight.castShadow = true
    object.sunLight.shadow.camera.near = 0
    object.sunLight.shadow.camera.far = 150 * 2

    object.sunLight.shadow.camera.left = -50 * 10
    object.sunLight.shadow.camera.right = 50 * 10
    object.sunLight.shadow.camera.bottom = -50 * 10
    object.sunLight.shadow.camera.top = 50 * 10

    object.sunLight.shadow.mapSize.width = 2048
    object.sunLight.shadow.mapSize.height = 2048
    object.sunLight.shadow.radius = 1
    object.sunLight.shadow.bias = -0.00035

    object.sunLight.shadow.intensity = 1.0
    object.sunLight.intensity = 2.0

    setSun(<primitive object={object}></primitive>)
    //
  }, [url, scene, env, background])

  //
  return <>{sun}</>
}
