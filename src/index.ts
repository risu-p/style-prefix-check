/**
 * 检查所有 less 文件，@prefix 定义是否有重名
 */

 import fs from 'fs';
 import path from 'path';
 import minimist from 'minimist';
import { ILessFileWidthPrefix } from './interface';

 console.log('\x1b[33mprefix检查开始...\x1b[0m')

 const argv = minimist(process.argv.slice(2));

 /**
  * 读取参数
  */
 const dir: string = argv['dir'] || '';
 if(!dir) {
    console.log('\x1B[31m请传入参数--dir（如：--dir=src）\x1b[0m')
    process.exit(1);
 }
 
 const PATH = path.resolve(dir)
 
 // less文件匹配符
 const LESS_REG_EXP = new RegExp('.less$')
 // 匹配当前文件中，所有的 @prefix: ~ 定义
 const PREFIX_REG_EXP = new RegExp('@prefix: *~ *[\'"](.*?)[\'"];', 'g')
 // 利用非全局匹配，获取到子表达式，即 prefix 的具体名字
 const PREFIX_NAME_REG_EXP = new RegExp('@prefix: *~ *[\'"](.*?)[\'"];')
 
 const lessFileWithoutPrefix: string[] = []
 const lessFileWithPrefix:ILessFileWidthPrefix[] = []
 
 /* 遍历所有文件 */
 const walkDir = (path: string) => {
   const files = fs.readdirSync(path)
   files.forEach(file => {
     const absPath = `${path}/${file}`
     /* 如果是目录，则递归调用 */
     if (isDirectory(absPath)) {
       walkDir(absPath)
     } else {
       /* 如果是.less */
       if (LESS_REG_EXP.test(file)) {
         const content = fs.readFileSync(absPath, 'utf8')
         const match = content.match(PREFIX_REG_EXP)
 
         /* 检测是否有@prefix: ~定义 */
         if (match) {
           // 提取出具体的prefix名称
           match.forEach((str, index) => {
             const nameMatch = str.match(PREFIX_NAME_REG_EXP)
             if (nameMatch && nameMatch[1]) {
               // match结果的[1]位，即为子表达式
               lessFileWithPrefix.push({
                 path: absPath,
                 prefix: nameMatch[1] || '',
               })
             }
           })
         } else {
           lessFileWithoutPrefix.push(absPath)
         }
       }
     }
   })
 }
 
 /* 检查路径是否是目录 */
 const isDirectory = (path: string) => fs.lstatSync(path).isDirectory()
 
 walkDir(PATH)
 
 /* prefix提取完成，判断是否有重名 */
 let duplicatePrefixArr: string[] = []
 let prefixMap: Record<string, 1 | 2> = {}
 
 lessFileWithPrefix.forEach(item => {
   const prefix = item.prefix
   if (!prefixMap[prefix]) {
     prefixMap[prefix] = 1 // 该prefix存在
   } else if (prefixMap[prefix] === 1) {
     duplicatePrefixArr.push(prefix)
     prefixMap[prefix] = 2 // 该prefix已经记录过重复了
   }
 })
 
 if (duplicatePrefixArr.length) {
   console.log('\x1B[31m以下prefix重复，请修改：\x1b[0m')
   duplicatePrefixArr.forEach(prefix => {
     console.log(`\x1B[0m${prefix}\x1b[0m`)
   })
   process.exit(1)
 } else {
   console.log(`\x1B[32mprefix检查通过，未重复\x1b[0m`)
 }
 