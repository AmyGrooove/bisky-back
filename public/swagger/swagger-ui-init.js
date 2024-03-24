
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/api/getOneRandomFact": {
        "get": {
          "operationId": "FactController_getOneRandomFact",
          "summary": "Get a random fact",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/FactModel"
                  }
                }
              }
            }
          },
          "tags": [
            "Fact"
          ]
        }
      },
      "/api/user/{animeId}/comment": {
        "put": {
          "operationId": "AnimeCommentController_addAnimeComment",
          "summary": "Add a comment to the anime",
          "parameters": [
            {
              "name": "animeId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateAnimeCommentDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "boolean"
                  }
                }
              }
            }
          },
          "tags": [
            "AnimeComment"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/api/user/{commentId}": {
        "patch": {
          "operationId": "AnimeCommentController_updateAnimeComment",
          "summary": "Update comment",
          "parameters": [
            {
              "name": "commentId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateAnimeCommentDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "boolean"
                  }
                }
              }
            }
          },
          "tags": [
            "AnimeComment"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "AnimeCommentController_deleteAnimeComment",
          "summary": "Delete comment",
          "parameters": [
            {
              "name": "commentId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "boolean"
                  }
                }
              }
            }
          },
          "tags": [
            "AnimeComment"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/api/user/{animeId}/status": {
        "put": {
          "operationId": "AnimeEstimateController_updateAnimeStatus",
          "summary": "Add/update anime from the list",
          "parameters": [
            {
              "name": "animeId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateAnimeStatusDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "boolean"
                  }
                }
              }
            }
          },
          "tags": [
            "AnimeEstimate"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "AnimeEstimateController_deleteAnimeFromList",
          "summary": "Remove anime from list",
          "parameters": [
            {
              "name": "animeId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "boolean"
                  }
                }
              }
            }
          },
          "tags": [
            "AnimeEstimate"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/api/user/{animeId}/score": {
        "patch": {
          "operationId": "AnimeEstimateController_updateAnimeScore",
          "summary": "Update anime rating in the list",
          "parameters": [
            {
              "name": "animeId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateAnimeScoreDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "boolean"
                  }
                }
              }
            }
          },
          "tags": [
            "AnimeEstimate"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/api/user/{animeId}/watchedSeriesCount": {
        "patch": {
          "operationId": "AnimeEstimateController_updateAnimeWatchedSeriesCount",
          "summary": "Update the number of watched anime episodes in the list",
          "parameters": [
            {
              "name": "animeId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateAnimeWatchedSeriesDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "boolean"
                  }
                }
              }
            }
          },
          "tags": [
            "AnimeEstimate"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/api/auth/login": {
        "post": {
          "operationId": "AuthController_login",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/LoginUserDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/api/auth/register": {
        "post": {
          "operationId": "AuthController_register",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateUserDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/api/auth/logout": {
        "get": {
          "operationId": "AuthController_logout",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Auth"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/api/auth/refresh": {
        "get": {
          "operationId": "AuthController_refreshTokens",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Auth"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/api/auth/whoami": {
        "get": {
          "operationId": "AuthController_whoami",
          "summary": "Check access-token",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            }
          },
          "tags": [
            "Auth"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      }
    },
    "info": {
      "title": "Bisky API",
      "description": "",
      "version": "2.0",
      "contact": {}
    },
    "tags": [],
    "servers": [],
    "components": {
      "securitySchemes": {
        "bearer": {
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "type": "http"
        }
      },
      "schemas": {
        "FactModel": {
          "type": "object",
          "properties": {
            "en": {
              "type": "string"
            },
            "ru": {
              "type": "string"
            }
          },
          "required": [
            "en",
            "ru"
          ]
        },
        "UpdateAnimeCommentDto": {
          "type": "object",
          "properties": {
            "text": {
              "type": "string",
              "minLength": 1,
              "maxLength": 450
            }
          },
          "required": [
            "text"
          ]
        },
        "UpdateAnimeStatusDto": {
          "type": "object",
          "properties": {
            "status": {
              "type": "string",
              "enum": [
                "added",
                "watching",
                "completed",
                "dropped"
              ],
              "nullable": true
            }
          },
          "required": [
            "status"
          ]
        },
        "UpdateAnimeScoreDto": {
          "type": "object",
          "properties": {
            "score": {
              "type": "number",
              "minimum": 1,
              "maximum": 10,
              "nullable": true
            }
          },
          "required": [
            "score"
          ]
        },
        "UpdateAnimeWatchedSeriesDto": {
          "type": "object",
          "properties": {
            "watchedSeriesCount": {
              "type": "number",
              "minimum": 0
            }
          },
          "required": [
            "watchedSeriesCount"
          ]
        },
        "LoginUserDto": {
          "type": "object",
          "properties": {
            "username": {
              "type": "string"
            },
            "password": {
              "type": "string"
            }
          },
          "required": [
            "username",
            "password"
          ]
        },
        "CreateUserDto": {
          "type": "object",
          "properties": {
            "username": {
              "type": "string"
            },
            "password": {
              "type": "string"
            },
            "email": {
              "type": "string"
            }
          },
          "required": [
            "username",
            "password",
            "email"
          ]
        },
        "User": {
          "type": "object",
          "properties": {
            "username": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "avatar": {
              "type": "string",
              "nullable": true
            },
            "role": {
              "type": "string",
              "enum": [
                "user",
                "moderator",
                "admin"
              ]
            },
            "lastOnlineDate": {
              "format": "date-time",
              "type": "string"
            }
          },
          "required": [
            "username",
            "email",
            "avatar",
            "role",
            "lastOnlineDate"
          ]
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
