import token from '../lib';

(async () => {
  const Token = new token({
    privateKey: 'secret',
    tokenDuration: '2w',
  });
  
  const t1 = await Token.create({
    payload: {
      foo: 1,
    },
  });
  
  console.log(123, t1);
})();
