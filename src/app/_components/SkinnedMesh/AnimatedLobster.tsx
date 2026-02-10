import { useAnimations, useFBX, useGLTF } from '@react-three/drei'
import { useEffect, useMemo } from 'react'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js'

export function AnimatedLobster({
  glbURL = `/avatar/lobsters/chef/mixa-lobster-transformed.glb`,
  fbxURL = `/avatar/lobsters/chef/motion/thriller3.fbx`,
}) {
  const motion = {
    thriller: useFBX(fbxURL),
  }
  const glb = useGLTF(glbURL)

  const glbScene = useMemo(() => {
    return clone(glb.scene)
  }, [glb.scene])

  const ani = useAnimations([...motion.thriller.animations], glbScene)

  useEffect(() => {
    ani.actions[ani.names[0] as string]?.play()
  }, [ani])

  return (
    <>
      <primitive object={glbScene}></primitive>
    </>
  )
}
