import {getOne, hasKey, initData, saveOne} from "../utils/db";

const name =  'user'

export function exist (username) {
    return hasKey(name, username)
}

export function reg(user) {
    return saveOne(name, user.username, user)
}

export function login(user){
    const loginUser=getOne(name, user.username)
    return loginUser&&loginUser.password===user.password?loginUser:undefined
}

export function update(id,value,fieldName){
    const user = getOne(name,id)
    user[fieldName] = value
    reg(user)
}

export function getUser(username) {
    return getOne(name, username)
}

export function initUser(users) {
    initData(name,users)
}
