function verifyGatewaySecret(req, res, next) {
  const gatewaySecret = req.header('X-Gateway-Secret');
  const sharedSecret = process.env.GATEWAY_SECRET || 'local_test_back';

  // Si no trae el secreto o es incorrecto, bloqueamos la petición
  if (!gatewaySecret || gatewaySecret !== sharedSecret) {
    console.warn(`Intento de acceso bloqueado. Secreto recibido: ${gatewaySecret}`);
    return res.status(403).json({ 
      error: 'Acceso denegado. Petición no autorizada por el API Gateway.' 
    });
  }

  // Si el secreto es correcto, dejamos pasar la petición hacia las rutas
  next();
}

module.exports = verifyGatewaySecret;