export default function(router) {
    router.get('/', function(req, res) {
        res.send('hello world');
    });
}