cd Website-Nex
pm2 stop all
git pull
npm run build
pm2 start all