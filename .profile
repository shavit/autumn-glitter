#!/bin/sh

CURRENT_DIR=`pwd`
WEBPACK_BIN_PATH=$CURRENT_DIR/node_modules/webpack/bin
WEBPACK_SERVER_BIN_PATH=$CURRENT_DIR/node_modules/webpack-dev-server/bin


# Optional if you don't have Webpack
# Write executable into webpack/bin instead of running it globally
echo """
#!/bin/sh

node ${WEBPACK_BIN_PATH}/webpack.js
""" > $WEBPACK_BIN_PATH/webpack
chmod +x $WEBPACK_BIN_PATH/webpack
export PATH=$PATH:$WEBPACK_BIN_PATH

# Optional if you don't have Webpack Server
# Write executable into webpack-dev-server/bin instead of running it globally
echo """
#!/bin/sh

node ${WEBPACK_BIN_PATH}/webpack.js
""" > $WEBPACK_BIN_PATH/webpack-dev-server
chmod +x $WEBPACK_BIN_PATH/webpack-dev-server
export PATH=$PATH:$WEBPACK_SERVER_BIN_PATH
