import { exec } from 'node:child_process'

const packages = ['subscription', 'public']
packages.forEach((p) => exec(`cp -R protofiles ./packages/${p}`))
