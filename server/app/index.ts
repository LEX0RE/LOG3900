import 'module-alias/register';
import 'reflect-metadata';
import { Server } from '@app/server';
import { Container } from 'typedi';

const server: Server = Container.get(Server);

server.init();
