<?php

namespace App\Events;

use App\Entity\Customer;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Todo;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class TodoUserSubscriber implements EventSubscriberInterface
{

    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setUserForTodo', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForTodo(ViewEvent $event)
    {
        $todo = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($todo instanceof Todo && $method === "POST") {
            // Choper l'utilisateur actuellement connecté
            $user = $this->security->getUser();
            // Assigner l'utilisateur au todo qu'on est en train de créer
            if ($user) {
                $todo->setPriority(0);
                $todo->setUser($user); // Içi
            }
        }
    }
}