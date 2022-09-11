<?php

declare(strict_types=1);

namespace App\Entity;

use App\Entity\User;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\TodoRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Knp\DoctrineBehaviors\Model\Timestampable\TimestampableTrait as TimestampableTrait;
use Knp\DoctrineBehaviors\Contract\Entity\TimestampableInterface as TimestampableInterface;

#[ORM\Entity(repositoryClass: TodoRepository::class)]
#[ApiResource(
    attributes: [
        "pagination_enabled" => false, // Surcharge et Active la pagination sur les todos
        "order" => ['priority'=> 'DESC']
    ], 
    normalizationContext:['groups' => 'todos_read']
)]
#[ApiFilter(SearchFilter::class, properties:['priority' => 'exact'])]
#[ApiFilter(OrderFilter::class, properties: ['createdAt' => 'DESC'])]
class Todo implements TimestampableInterface
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['todos_read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['todos_read', 'users_read'])]
    #[Assert\NotBlank(['message' => 'Not be blank'])]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['todos_read', 'users_read'])]
    private ?string $content = null;

    #[ORM\ManyToOne(inversedBy: 'todos')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['todos_read'])]
    private ?User $user = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['todos_read'])]
    #[Assert\Choice(['choices' => [0,1,2,3], 'message' => 'La priorité doit être AUCUNE, EASY, PRIORITAIRE ou URGENT'])]
    private ?int $priority = null;

    #[Groups(['todos_read'])]
    protected $createdAt;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getPriority(): ?int
    {
        return $this->priority;
    }

    public function setPriority(?int $priority): self
    {
        $this->priority = $priority;

        return $this;
    }
}
