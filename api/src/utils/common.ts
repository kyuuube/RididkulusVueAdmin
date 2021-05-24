/* tslint:disable */
import * as dayjs from 'dayjs'

export const buildTree = (list: any[]) => {
    const temp = {}
    const tree = {}
    for (const i in list) {
        temp[list[i].id] = list[i]
    }
    for (const i in temp) {
        if (temp[i].parentId) {
            if (!temp[temp[i].parentId].children) {
                temp[temp[i].parentId].children = {}
            }
            temp[temp[i].parentId].children[temp[i].id] = temp[i]
        } else {
            tree[temp[i].id] = temp[i]
        }
    }
    return tree
}

export const buildTreeList = (source: any) => {
    const cloneData = JSON.parse(JSON.stringify(source)) // 对源数据深度克隆
    return cloneData.filter((father) => {
        // 循环所有项，并添加children属性
        const branchArr = cloneData.filter(
            (child) => father.id === child.parentId
        ) // 返回每一项的子级数组
        branchArr.length > 0 ? (father.children = branchArr) : '' //给父级添加一个children属性，并赋值
        return father.parentId == null //返回第一层
    })
}

export const getOneDayTimeStamp = () => {
    const date = new Date()
    const time = date.getTime() //当前的毫秒数
    const oneDay = 86400000 //1000 * 60 * 60 * 24; //一天的毫秒数
    return time + oneDay
}
// 休眠函数
export const sleepPromise = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms))
/**
 * 返回当前时间
 */
export const currentDateTime = () => {
    return dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
}

/**
 * 返回若干年、月、日、前的日期，默认：day 格式 20210101
 */
export const getDateOfBefore = (
    n: number,
    scale: 'day' | 'month' | 'year' = 'day'
) => {
    return dayjs().subtract(n, scale).format('YYYYMMDD')
}
