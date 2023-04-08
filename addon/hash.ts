import md5 from 'md5'

export function getHash(): string { return md5(String(new Date().getTime() * Math.random())) }