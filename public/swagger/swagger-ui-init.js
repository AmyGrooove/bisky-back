
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
      "/api/user/{commentId}/like": {
        "patch": {
          "operationId": "AnimeCommentLikeController_updateAnimeCommentLike",
          "summary": "Add/Delete/Update like on comment",
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
                  "$ref": "#/components/schemas/UpdateAnimeCommentLikeDto"
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
      "/api/user/{animeId}/status": {
        "patch": {
          "operationId": "AnimeEstimateController_updateAnimeStatus",
          "summary": "Add/Update anime from the list",
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
      },
      "/api/auth/register": {
        "put": {
          "operationId": "AuthController_register",
          "summary": "Sign Up",
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
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TokensModel"
                  }
                }
              }
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/api/auth/login": {
        "post": {
          "operationId": "AuthController_login",
          "summary": "Sign In",
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
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TokensModel"
                  }
                }
              }
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/api/auth/refresh": {
        "patch": {
          "operationId": "AuthController_refreshTokens",
          "summary": "Renew Access Token",
          "parameters": [
            {
              "name": "Authorization",
              "required": true,
              "in": "header",
              "description": "RefreshToken (starting with \"Bearer \")",
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
                    "$ref": "#/components/schemas/TokensModel"
                  }
                }
              }
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/api/auth/logout": {
        "patch": {
          "operationId": "AuthController_logout",
          "summary": "Log off the network (remove refreshToken from the database)",
          "parameters": [],
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
            "Auth"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/api/auth/google": {
        "get": {
          "operationId": "OAuth2Controller_googleLogin",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/api/auth/google/callback": {
        "get": {
          "operationId": "OAuth2Controller_googleLoginCallback",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Auth"
          ]
        }
      }
    },
    "info": {
      "title": "Bisky API",
      "description": "",
      "version": "1.2.0",
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
        "UpdateAnimeCommentLikeDto": {
          "type": "object",
          "properties": {
            "like": {
              "type": "boolean",
              "nullable": true,
              "description": "If null, then the like is deleted"
            }
          },
          "required": [
            "like"
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
        },
        "CreateUserDto": {
          "type": "object",
          "properties": {
            "username": {
              "type": "string",
              "minLength": 3,
              "maxLength": 30
            },
            "password": {
              "type": "string",
              "minLength": 6
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
        "TokensModel": {
          "type": "object",
          "properties": {
            "accessToken": {
              "type": "string"
            },
            "refreshToken": {
              "type": "string"
            }
          },
          "required": [
            "accessToken",
            "refreshToken"
          ]
        },
        "LoginUserDto": {
          "type": "object",
          "properties": {
            "username": {
              "type": "string",
              "minLength": 3,
              "maxLength": 30
            },
            "password": {
              "type": "string",
              "minLength": 6
            }
          },
          "required": [
            "username",
            "password"
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
