import { Router } from 'express';import express from 'express';
import { requestForwarderMiddleware } from '../../middleware/requestForwarder';
import { authMiddleware, trackApiUsage } from '../../middleware/auth';
import { createApiRoute } from '../route-helpers'
export const macroRouter = Router();
const commonMiddleware = [requestForwarderMiddleware, authMiddleware, trackApiUsage];


/**
 * Get all macros
 * 
 * Retrieves a list of all macros available in the Foundry world.
 * 
 * @route GET /macros
 * @returns {object} An array of macros with details
 */
macroRouter.get("/macros", ...commonMiddleware, createApiRoute({
    type: 'macros',
    requiredParams: [
        { name: 'clientId', from: 'query', type: 'string' } // The ID of the Foundry client to connect to
    ]
}));

/**
 * Execute a macro by UUID
 * 
 * Executes a specific macro in the Foundry world by its UUID.
 * 
 * @route POST /macro/:uuid/execute
 * @returns {object} Result of the macro execution
 */
macroRouter.post("/macro/:uuid/execute", ...commonMiddleware, createApiRoute({
    type: 'macro-execute',
    requiredParams: [
        { name: 'clientId', from: 'query', type: 'string' }, // The ID of the Foundry client to connect to
        { name: 'uuid', from: 'params', type: 'string' } // UUID of the macro to execute
    ],
    optionalParams: [
        { name: 'args', from: 'body', type: 'object' } // Optional arguments to pass to the macro execution
    ]
}));