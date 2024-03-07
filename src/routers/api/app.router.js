import { Router } from "express";
const router=Router();

router.get('/loggerTest', (req,res)=>{
    req.logger.info('Ejemplo de información')
    req.logger.error('Ejemplo de error')
    req.logger.warning('Ejemplo de advertencia')
    req.logger.fatal('Ejemplo de error fatal')
    req.logger.http('http')
    req.logger.debug('test debug')
    res.status(200).json({message:'Hola desde el backend'})
 })


 export default router;