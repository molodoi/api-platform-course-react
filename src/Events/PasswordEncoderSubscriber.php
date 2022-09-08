<?php

namespace App\Events;

use App\Entity\User;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

/**
 * Hasher le password
 */
class PasswordEncoderSubscriber implements EventSubscriberInterface
{

    public function __construct(private UserPasswordHasherInterface $passwordHasher)
    {
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['encodePassword', EventPriorities::PRE_WRITE]
        ];
    }

    public function encodePassword(ViewEvent $event)
    {
        // On récupère le User
        $user = $event->getControllerResult();
        // On récupère la methode 
        $method = $event->getRequest()->getMethod(); // POST, GET, PUT, ...

        if ($user instanceof User && $method === "POST") {
            $hashedPassword = $this->passwordHasher->hashPassword(
                $user,
                $user->getPassword()
            );
            $user->setPassword($hashedPassword);
            $user->setRoles(['ROLE_USER']); 
        }
    }
}