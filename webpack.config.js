/*webpack: para realizar importaciones, ej funciones desde otro modulo(ruta).
Contiene el webpack-cli, una herramienta para solo "desarrollo" que utilian los frameworks mas populares, para generar tareas automaticas, como por ejemplo copiar y mover archivos, borrar, cambiar nombre,  hacer iyecciones en el html de manera automatica, minimizar codigo, y que sea compatible con la mayoria de navegadores, etc.
webpack se instala en el package.json en devDependencies,dependencia de desarrollo, quiere decir que no van a llegar a la version de produccion.
Dependencia desarrollo: 
Los modulos de node no es algo que vaya a ser necesario en produccion a menos que tengamos ciertos paquetes que si necesiten ir a produccion.
Cuando se genera el build de produccion va a limpiar comentarios, tabulaciones, ofuscacion de codigo para subir a la web.
package.json:
En la parte de los script, creamos el comando build para poder ejecutar desde la terminal, por defecto el webpack ya cuenta con cierta informacion por ejemplo: la carpeta de destino de la aplicacion y que va a trabajar solo con archivos de tipo javaScript.
al ejecutar el comando "npm run build" va a instanciar una carpeta dist (distrubucion: produccion) con un archivo main.js que va a estar minimizado y un warning indicando que por defecto se generó en modo de produccion al no contar con un archivo de configuracion que le diga la contrario.(ver *)

Luego para lograr importar las funciones se debe anteponer el comando export antes de las funciones que invocamos en el index.js, de esta manera al ejecutar el comando "npm start" va a generar el localhost llamando las funciones.
En todos los frameswork se trabaja con esta metodologia para poder crear y separar la logica en varios archivos, permitiendo usar el css encapsulado, pasar las imagenes, crearse aplicaciones y todo de forma automatico para que sea lo mas optimo para la web.
dist:
main.js: va a ser la combinacion del archivo index + componentes ya ofuscado y minimizado
lo no dist:
es mi proyecto y modo de desarrollo, los modulos de webpack nos va a permitir trabajar compatibilizar con otros navegadores web.

(*) Dentro del archivo package.json en build vamos a reemplazar el stirng por "webpack --config prod.config.js" de esta manera especificamos un archivo de js que se llamara junto con el webpack, ese archivo lo creamos al mismo nivel de archivo package.json que tendra la configuracion .

De esta manera al ejecutar "npm run build" nuestro archivo main.js de la carpeta dist ya no estara minimizado sino con funciones automaticas que permitio inyectar codigo js en este unico archivo.

webpack.config.js: es nuestro punto de entrada, donde hacemos las configuraciones de como queremos que funcione wedpack,(mode, rules, optimizations y plugins).
*/ 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development', // por defecto cuando no generamos este archivo tomaba el nombre produccion
    output:{// sirve para al realizar "npm run build" reemplace el contenido de dist sin duplicar. 
        clean: true
    },
    module: {
        rules: [
            // rules for modules (configure loaders, parser options, etc.)
            {
                test:/\.html$/, //Expresion regular para buscar si un string hace match con otro string .html
                loader: 'html-loader',//Cuando hace match llama al loader.
                options:{//En caso q los html a copiar en dist tengan atributos, stilos, imagenes tambien los mueve y crea un hash, todo por nosotros. 
                    sources: false
                }
            },
            {// una vez instalado de styles-load y css-loaders aplicamos  la siguiente regla para que webpack pueda traducir los archivos css a su version de js.
                test: /\.css$/i,
                exclude: /styles.css$/i, // excluimos para crear un archivo global de estilos
                use: ['style-loader','css-loader']
            },
            {//evaular el archivo styles.css 
                test: /styles.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options:{
                    esModule: false,
                    name: 'assets/img/[name].[ext]'
                },
            }
        ]
    },
    optimization: {},
    plugins:[// son arrays donde configuramos nuevas instancias
        new HtmlWebpackPlugin({
            //de esta manera en desarrollo podemos poenerle cualquier nombre que cuando hagamos "npm run build" el archivo index.html tendra de manera automatica el nombre del archivo js del cual hace los script.
            title: 'Mi webpack App',
            // filename: 'index.html', //(opcional)
            template: './src/index.html' // Es el archivo del cual se va a basar este archivo
        }),
        new MiniCssExtractPlugin({
            //filename: '[name].css',
            //ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
              { from: "src/assets/", to: "assets/" },
            ],
          }),
    ]
}