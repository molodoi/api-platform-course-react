<?php
declare(strict_types=1);
namespace App\DataFixtures;

use DateTime;
use App\Entity\Todo;
use App\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


class AppFixtures extends Fixture
{    

    public function __construct(private UserPasswordHasherInterface $passwordHasher)
    {
        
    }

    public function load(ObjectManager $manager): void
    {
        // $product = new Product();
        // $manager->persist($product);

        $this->loadUsersTodos($manager);
    }

    public function loadUsersTodos(ObjectManager $manager)
    {
        
        for($u = 0; $u < 10; $u++) {
            $user = new User();
            $plaintextPassword = 'password';
            $hashedPassword = $this->passwordHasher->hashPassword(
                $user,
                $plaintextPassword
            );
            if($u == 0){
                $user->setEmail('test@test.fr');
                $user->setRoles(['ROLE_ADMIN']);   
            }else{
                $user->setEmail('test'.$u.'@test.fr');
                $user->setRoles(['ROLE_USER']);   
            }
            $user->setPassword($hashedPassword);

            $manager->persist($user);

            for($t = 0; $t < 12 ; $t++){
                $todo = new Todo();

                $todo->setTitle('Todo '.$t)
                    ->setContent('Faire ceci, faire cela '.$t)
                    ->setPriority(random_int(0,3))
                    ->setUser($user);

                $manager->persist($todo);       
            }
            $manager->flush();
        }
    }
}
