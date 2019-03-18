import axios from 'axios';

let base = '';

base = 'http://127.0.0.1:8081';
// base = 'http://39.98.79.79:8081';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const createSkill = params => axios.post(`${base}/skill/createSkill`, params);
export const updateSkill = params => axios.post(`${base}/skill/updateSkill`, params);
export const getSkillList = params => axios.post(`${base}/skill/getSkillList`, params);
export const deleteSkill = params => axios.post(`${base}/skill/deleteSkill`, params);
export const querySkillById = params => axios.post(`${base}/skill/querySkillById`, params);

export const createWeapon = params => axios.post(`${base}/weapon/createWeapon`, params);
export const updateWeapon = params => axios.post(`${base}/weapon/updateWeapon`, params);
export const getWeaponList = params => axios.post(`${base}/weapon/getWeaponList`, params);
export const deleteWeapon = params => axios.post(`${base}/weapon/deleteWeapon`, params);
export const queryWeaponById = params => axios.post(`${base}/weapon/queryWeaponById`, params);
export const queryBaseWeapon = params => axios.post(`${base}/weapon/queryBaseWeapon`, params);
