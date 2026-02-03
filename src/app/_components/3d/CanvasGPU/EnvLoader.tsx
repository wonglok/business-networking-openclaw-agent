import { useEffect } from 'react'
import { rgbeLoader } from './CanvasGPU'
import { useThree } from '@react-three/fiber'
import { Color, EquirectangularReflectionMapping } from 'three'

export function EnvLoader({
  url,
  background = false,
  env = true,
}: {
  url: string
  background?: boolean
  env?: boolean
}) {
  const scene = useThree((r) => r.scene)
  useEffect(() => {
    //
    rgbeLoader.loadAsync(url).then((data) => {
      //

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
    //
  }, [url, scene, env, background])

  //
  return null
}
