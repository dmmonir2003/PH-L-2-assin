
 Appollo Assignment -2
  
  # PH-L-2-assin:   command key 

    I use deploy server side in vercel 
   please install devDependencies use this pacages :
   
    "@types/bcrypt": "^5.0.2",
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@typescript-eslint/eslint-plugin": "^6.12.0",
    "@typescript-eslint/parser": "^6.12.0",
    "eslint": "^8.54.0",
    "eslint-config-prettier": "^9.0.0",
    "prettier": "^3.1.0",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.3.2"


    than run comand :use this key word 
   use this comund for deploy -> vercel --prod
   
   use this comund-> npm run start:prod  -> for  node ./dist/server.js
   use this comund-> npm run start:dev  -> for  ts-node-dev --respawn --transpile-only src/server.ts
   use this comund-> npm run build  -> for  tsc
   use this comund-> npm run lint  -> for  eslint src --ignore-path .eslintignore --ext .ts
   use this comund-> npm run lint:fix  -> for  npx eslint src --fix
   use this comund-> npm run prettier  -> for  prettier --ignore-path .gitignore --write \"**/*.+(js|ts|json)\
   use this comund-> npm run prettier:fix  -> for  npx prettier --write src






   
   
