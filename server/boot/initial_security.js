"use strict";
var log4js = require('log4js');
var logger = log4js.getLogger("odata");
var InitSecurity = (function () {
    function InitSecurity(app) {
        this.User = app.models.User;
        this.Role = app.models.Role;
        this.RoleMapping = app.models.RoleMapping;
    }
    ;
    InitSecurity.prototype.init = function () {
        var _this = this;
        this.User.findOne({ where: { email: 'user1@tammen-it-solutions.de' } }).then(function (user) {
            if (!user) {
                _this.User.create({ username: 'user1', email: 'user1@tammen-it-solutions.de', password: 'secret' }).then(function (user) {
                    if (user) {
                        logger.debug("User created: " + JSON.stringify(user.toJSON()));
                        _this.initRoleForUser(user);
                    }
                    else {
                        logger.error("user 'user1' could not be created. Program may not work as expected");
                    }
                });
            }
            else {
                _this.initRoleForUser(user);
            }
        }).catch(function (err) {
            logger.error("error: " + err);
        });
    };
    ;
    InitSecurity.prototype.initRoleForUser = function (user) {
        var _this = this;
        this.Role.findOne({ where: { name: 'r_businesstrips_access' }, include: 'principals' }).then(function (role) {
            if (!role) {
                _this.Role.create({ name: 'r_businesstrips_access', description: 'grants general access to businesstrips' }).then(function (role) {
                    if (role) {
                        logger.debug("Role created: " + JSON.stringify(role.toJSON()));
                        _this.assignUserToRole(user, role);
                    }
                    else {
                        logger.error("role 'r_businesstrips_access' could not be created. Program may not work as expected");
                    }
                });
            }
            else {
                _this.assignUserToRole(user, role);
            }
        });
    };
    InitSecurity.prototype.assignUserToRole = function (user, role) {
        var _this = this;
        this.RoleMapping.findOne({ where: { principalType: this.RoleMapping.USER, principalId: user.id, roleId: role.id } }).then(function (roleMapping) {
            if (!roleMapping) {
                role.principals.create({
                    principalType: _this.RoleMapping.USER,
                    principalId: user.id
                }).then(function (roleMapping) {
                    logger.debug("Rolemapping created: " + JSON.stringify(roleMapping.toJSON()));
                });
            }
        });
    };
    return InitSecurity;
}());
module.exports = function initial_security(app) {
    logger.debug("starting initial_security script");
    var initSecurity = new InitSecurity(app);
    initSecurity.init();
};
//# sourceMappingURL=initial_security.js.map