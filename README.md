### Require without caches
it will check the module is already in `require.cache` before a module require, if so, both self cache and module's children caches will be droped cursively, and return a reforming exports.

### The use of Scenario
here is an simply example for express app used together with `jsonServer` to serve mock datas:
``` javascript
import incog from 'incog'
import database from './mocks'
...

const app = express()
const router = jsonServer.router(database)

app.use('/mock', router)

// if has file changed, regenerate mock datas
fs.watch('./mock', { recursive: true }, (evt, file) => {
  if (file) {
    const state = incog('./mocks')
    router.db.setState(state)
  }
})
```